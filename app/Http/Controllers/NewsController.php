<?php

namespace App\Http\Controllers;

use App\Library\NewsApi;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    use NewsApi;

    /**
     * Display the News List in table.
     */
    public function index()
    {
        $newsList = $this->where('q' , 'usa')->get();
        echo '<pre>';
        print_r($newsList);
    }
}
