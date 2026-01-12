<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $guarded = [];
    
    
    public function wallet() {
        return $this->belongsTo(Wallet::class, 'wallet_id', "id");
    }
    public function category() {
        return $this->belongsTo(category::class, 'category_id', "id");
    }
}
