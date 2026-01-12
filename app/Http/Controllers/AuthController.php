<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            "full_name" => "required",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:6"
        ]);

        $user = User::create([
            "name" => $request->full_name,
            "email" => $request->email,
            "password" => $request->password,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->token = $token;

        return response()->json([
            "status" => "success",
            "message" => "Registration successful",
            "data" => $user
        ]);
    }


    public function login(Request $request)
    {
        $request->validate([
            "email" => "required",
            "password" => "required"
        ]);

        $user = User::where('email', $request->email)->first();
        // $token = $user->
        if ($user && Hash::check($request->password, $user->password)) {
             $token = $user->createToken('auth_token')->plainTextToken;
             $user->token = $token;
            return response()->json([
                "status" => "success",
                "message" => "Login successful",
                "data" => $user

            ]);
        } else {
             return response()->json([
               "status" => "error",
"message" => "Username or password incorrect"

            ], 401);
        }
    }
    
    
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "status" => "success",
"message" => "Logout successful"
        ]);
    }
}
