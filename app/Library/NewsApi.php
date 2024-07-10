<?php

namespace App\Library;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;

trait NewsApi
{

    private $apiKey = '3faa93ff970d4d3ab6b5bb64ba6e28b9';
    private $url = 'https://newsapi.org/v2/everything';


    /**
     * Default values in array.
     */
    private $arr = [
        'sortBy' => 'popularity',
        'q' => 'india'
    ];


    /**
     * Default Page Size in Request.
     */
    private $pageSize = 20;


    /**
     * Where clause to the query.
     *
     * @param  string|array  $column
     * @param  mixed  $value
     * @return $this
     */
    private function where($column, $value = null)
    {
        if (is_array($column) && is_null($value)) {
            $this->arr = array_merge($this->arr, $column);

        } elseif(is_string($column) && !is_null($value)) {
            $this->arr[$column] = $value;
        }

        return $this;
    }


    /**
     * ShortBy clause to the query.
     *
     * @param  string  $sort
     * @return $this
     */
    private function shortBy(string $sort)
    {
        $this->arr['sortBy'] = $sort;
        return $this;
    }


    public function get()
    {
        $response = Http::withHeaders([
            'X-Api-Key' => $this->apiKey,
        ])
            ->get($this->url, $this->arr);

        return json_decode($response->body());
    }

    public function paginate($perPage) {
        
        $data = $this->get();
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = array_slice($data['articles'], ($currentPage - 1) * $perPage, $perPage);
    }

}
