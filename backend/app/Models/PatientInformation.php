<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'age', 'gender', 'number', 'emergency', 'address', 'patient_id'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($patientInformation) {
            $patientInformation->patient_id = self::generateUniquePatientId();
        });
    }

    private static function generateUniquePatientId()
    {
        $prefix = 'PID';
        $uniqueId = $prefix . strtoupper(uniqid());
        
        // Ensure uniqueness
        while (self::where('patient_id', $uniqueId)->exists()) {
            $uniqueId = $prefix . strtoupper(uniqid());
        }

        return $uniqueId;
    }
}
