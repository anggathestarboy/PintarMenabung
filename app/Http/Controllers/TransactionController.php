<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->query("per_page", 25);

        $transaksi = Transaction::with(['wallet', 'category'])->whereRelation('wallet', "user_id", $user->id);



        if ($request->query('month')) {
            $transaksi->whereMonth('date', $request->query('month'));
        }

        if ($request->query('year')) {
            $transaksi->whereYear('date', $request->query('year'));
        }



        $transaksiDetail = $transaksi->paginate($perPage);
        return response()->json($transaksiDetail);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function get()
    {
        $summary = Transaction::with('category')
            ->whereRelation('wallet', 'user_id', auth()->id())
            ->whereRelation('category', 'type', 'EXPENSE')
            ->select('category_id')
            ->selectRaw('SUM(amount) as amount')
            ->groupBy('category_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Get summary by Expense category successful',
            'data' => [
                'summary' => $summary->map(fn($item) => [
                    'category' => $item->category,
                    'amount' => $item->amount
                ])
            ]
        ]);
    }
    public function getIncome()
    {
        $summary = Transaction::with('category')
            ->whereRelation('wallet', 'user_id', auth()->id())
            ->whereRelation('category', 'type', 'INCOME')
            ->select('category_id')
            ->selectRaw('SUM(amount) as amount')
            ->groupBy('category_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Get summary by Income category successful',
            'data' => [
                'summary' => $summary->map(fn($item) => [
                    'category' => $item->category,
                    'amount' => $item->amount
                ])
            ]
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data =  $request->validate([
            "wallet_id" => "required|exists:wallets,id",
            "category_id" => "required|exists:categories,id",
            "amount" => "required|numeric",
            "date" => "required|date",
            "note" => "nullable"

        ]);


        $operator = Category::where('id', $request->category_id)->first();
        $jumlahAkhir = 0;



        if ($operator->type === "EXPENSE") {
            $jumlahAkhir =  $request->amount - $request->amount * 2;
        }
        
             if ($operator->type === "INCOME") {
            $jumlahAkhir =  $request->amount;
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
    public function destroy($transactionId)
    {
        $transaksi = Transaction::find($transactionId);

        if (!$transaksi) {
            return response()->json([
                "status" => "error",
                "message" => "Not Found"
            ], 404);
        }
        $user = Auth::user();

        $transaksiDetail = $transaksi->load('wallet');

        if ($user->id !== $transaksiDetail->wallet->user_id) {
            return response()->json([
                "status" => "error",
                "message" => "Forbidden access"
            ], 403);
        } else {
            $transaksi->delete();
        }


        return response()->json([
            "status" => "success",
            "message" => "Sukses menghapus data"
        ], 200);
    }
}
