<?php

namespace App\Http\Controllers;

use App\Library\NewsApiService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    use NewsApiService;

    /**
     * Display the News List in table.
     */
    public function index(Request $request)
    {
        // NewsApiService Params
        $params = [
            'q' => 'india'
        ];
        
        // NewsApiService Query
        $news_list = $this->where($params)->paginate(15)->appends($request->all())->toArray();
    //     echo '<pre>';
    //    print_r($news_list);die;
        return Inertia::render(
            'Welcome',
            compact('news_list')
        );
    }

    
}
