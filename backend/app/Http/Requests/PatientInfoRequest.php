<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PatientInfoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/u',
            'age' => 'required|integer|min:0|max:120',
            'gender' => 'required|string|in:Male,Female,Other',
            'number' => 'required|string|max:20|regex:/^\+?[0-9]+$/',
            'emergency' => 'required|string|max:20|regex:/^\+?[0-9]+$/',
            'address' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'name.regex' => 'The name may only contain English letters and spaces.',
            'age.integer' => 'The age must be a valid number.',
            'age.min' => 'The age must be at least 0.',
            'age.max' => 'The age may not be greater than 120.',
            'gender.in' => 'The gender must be either Male, Female, or Other.',
            'number.max' => 'The phone number may not be greater than 20 characters.',
            'emergency.max' => 'The emergency number may not be greater than 20 characters.',
            'number.regex' => 'The phone number format is invalid.',
            'emergency.regex' => 'The emergency number format is invalid.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = [
            'status' => false,
            'message' => 'Validation Error',
            'errors' => $validator->errors(),
        ];

        throw new HttpResponseException(response()->json($response, 400));
    }
}
