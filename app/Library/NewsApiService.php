<?php

namespace App\Library;

use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;

trait NewsApiService
{

    private $apiKey = '3faa93ff970d4d3ab6b5bb64ba6e28b9';
    private $url = 'https://newsapi.org/v2/everything';

    private $removeItem = '[Removed]';
    /**
     * Default values in array.
     */
    private $arr = [
        'sortBy' => 'popularity',
        'q' => 'india'
    ];



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
        } elseif (is_string($column) && $value) {
            $this->arr[$column] = $value;
        }

        return $this;
    }


    /**
     * Where Date clause to the query.
     *
     * @param  string  $from
     * @param  string  $to
     * @return $this
     */
    private function whereDateBetween(string $from, string $to)
    {
        if ($from && $to) {
            $this->arr['from'] = date('Y-m-d', strtotime($from));
            $this->arr['to'] = date('Y-m-d', strtotime($to));
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


    /**
     * Exclude Removed items from List. 
     *
     * @return $this
     */
    private function qParam()
    {
        $q = $this->arr['q'];
        // $this->arr['q'] = $this->arr['q'] .' NOT ' . $this->removeItem.'';
        // $this->arr['q'] = "($q) NOT $this->removeItem";
        //print_r($this->arr);die;

        return $this;
    }

    /**
     * Exclude Removed items from List after fetch data through API. 
     *
     * @return $this
     */
    private function removeItem(&$res)
    {

        $escapable_items = array_map (function ($item) {
            return str_contains($item->title, $this->removeItem) ? $item: null;
        },$res->articles);
        

        if($escapable_items) {
            $keys = array_keys(array_filter($escapable_items));
            if($keys) {
                foreach($keys as $key) {
                    unset($res->articles[$key]);
                } 
            }

            // Reset array keys
            $res->articles = array_values($res->articles);
        }

        return true;
        
    }


    /**
     * Return all data.
     *
     * @return array|object
     */
    public function get()
    {
        $this->qParam();

        $response = Http::withHeaders([
            'X-Api-Key' => $this->apiKey,
         ])
         ->get($this->url, $this->arr);

        
        $res = json_decode($response->body());

        if($res->status == 'ok') {
            $this->removeItem($res);
            return $res;
        } else {
            throw new Exception($res->message, 1);
        }
    }


    /**
     * Return Paginate data through News API.
     *
     * @param  string  $sort
     * @return array|object
     */
    public function paginate($perPage)
    {

        $currentPage = LengthAwarePaginator::resolveCurrentPage();

        /**
         * Define page size & current page to fetch api
         */
        $this->arr['pageSize'] = $perPage;
        $this->arr['page'] = $currentPage;

        /**
         * Fetch Api Data through Get function 
         */
        $data = $this->get();

        $paginator = new LengthAwarePaginator($data->articles, $data->totalResults, $perPage);
        $paginator->setPath(request()->url());

        return $paginator;
    }


    
}
