<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{
    public function login(Request $request)
    {
        if(Auth::attempt($request->only('password', 'email' ))) {
            $user = Auth::user();
            $scope = $request->input('scope');

            if($user->isInfluencer() && $scope != 'influencer') {
                return response([
                    'error' => 'Access denied!'
                ], Response::HTTP_FORBIDDEN);
            }

            $token = $user->createToken($scope, [$scope])->accessToken;

            $cookie = \cookie('jwt', $token, 3600);

            return \response([
                'token' => $token
            ])->withCookie($cookie);
        }

        return response([
            'error' => 'Bad Credentials'
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function logout()
    {
        $cookie = \Cookie::forget('jwt');

        return \response([
           'message' => 'logout successful'
        ])->withCookie($cookie);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create($request->only('first_name', 'last_name', 'email') + [
                'password' => Hash::make($request->input('password')),
                'is_influencer' => 1
            ]);

        UserRole::create([
            'user_id' => $user->id,
            'role_id' => 1
        ]);

        return response($user, Response::HTTP_CREATED);
    }

    public function user()
    {
        $user = \Auth::user();
        $resource = new UserResource($user);

        if($user->isInfluencer()) {
            return $resource;
        }

        return $resource->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = \Auth::user();

        $user->update($request->only('first_name', 'last_name', 'email',));

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = \Auth::user();

        $user->update([
            'password' => Hash::make($request->input('password'))
        ]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
