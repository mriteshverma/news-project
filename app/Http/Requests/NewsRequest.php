<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'q' => 'nullable|required|max:255',
            'title' => 'nullable|required',
            'source' => 'nullable|required',
            'author' => 'nullable|required',
            'publishedAt' => 'nullable|date',
        ];
    }
}
