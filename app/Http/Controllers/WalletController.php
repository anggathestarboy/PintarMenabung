<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     $user = Auth::user();

$wallets = Wallet::where('user_id', $user->id)
    ->withSum('transaction as balance', 'amount')
    ->get();

return response()->json($wallets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "currency_code" => "required|exists:currencies,code"
        ]);


        $currencyId = Currency::where('code', $request->currency_code)->first();

        $wallet = Wallet::create([
            "user_id" => Auth::user()->id,
            "name" => $request->name,
            "currency_id" => $currencyId->id
        ]);

        $wallet->currency_code = $currencyId->code;

        return response()->json([
            "status" => "success",
            "message" => "Wallet added successful",
            "data" => $wallet

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($walletId)
    {
        $wallet = Wallet::find($walletId)->loadSum('transaction as balance', 'amount');
        $user = Auth::user();
        if(!$wallet) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        
        if ($wallet->user_id !== $user->id) {
            return response()->json([
                "message" => "forbiden"
            ], 403);
        }
        else {
        return response()->json($wallet);
            
        }
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wallet $wallet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $walletId)
    {

        $request->validate([
            "name" => "required"
        ]);
        $wallet = Wallet::find($walletId);
        $user = Auth::user();

        

        if (!$wallet) {
            return response()->json([

                "status" => "error",
                "message" => "Not found"
            ], 404);
        }
        
        $currencyCode = Currency::where('id', $wallet->id)->first();


        if ($wallet->user_id === $user->id) {
            $wallet->update([
                "name" => $request->name
            ]);
            
            $wallet->currency_code = $currencyCode->code;
        } else {
            return response()->json([
                "status" => "error",
                "message" => "Forbidden access"
            ], 403);
        }
        
        
        return response()->json([
            "status" => "success",
"message" => "Wallet updated successful",
"data" => $wallet
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($walletId)
    {
        
        $wallet = Wallet::find($walletId);
        
        $user = Auth::user();
        
        if (!$wallet) {
            return response()->json([
                "status" => "error",
"message" => "Not found"
            ], 404);
        }
        
        
        if ($wallet->user_id === $user->id) {
             $wallet->delete();
        return response()->json([
            "status" => "success",
"message" => "Wallet deleted successful"
        ]);
             
        }
        else {
            return response()->json([
                "status" => "error",
"message" => "Forbidden access"
            ], 403);
        }
       
    }
}
