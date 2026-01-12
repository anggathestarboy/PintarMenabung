<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $guarded = [];
    
    
    public function transaction() {
        return $this->hasMany(Transaction::class , 'wallet_id', "id");
    }
}
