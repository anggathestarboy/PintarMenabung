<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
      $data =  $request->validate([
                "wallet_id" => "required|exists:wallets,id",
                "category_id" => "required|exists:categories,id",
                "amount" => "required|integer",
                "date" => "required|date",
                "note" => "nullable"

        ]);

        
        $operator = Category::where('id', $request->category_id)->first();
        $jumlahAkhir = 0;
        
    
        
        if ($operator->type === "EXPENSE") {
              $jumlahAkhir =  $request->amount - $request->amount * 2;
        }
        
        
        // return response()->json($jumlahAkhir);
        
        
     $transaksi =   Transaction::create([
                "wallet_id" => $request->wallet_id,
                "category_id" => $request->category_id,
                "amount" => $jumlahAkhir,
                "date" => $request->date,
                "note" => $request->note,
     ]);
        return response()->json([
            "status" => "success",
"message" => "Transaction added successful",
"data" => $transaksi
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
