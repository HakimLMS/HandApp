<?php

namespace App\Controller;

use App\Services\TwitterService;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Message;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class TwitterPostController extends FOSRestController
{
    /**
     * @Rest\Post(
     * path="/twitter/post", 
     * name="twitter"
     * )
     * @Rest\View()
     * @ParamConverter("message", converter="fos_rest.request_body")
     */
    public function postTweet(TwitterService $twitter, Message $message)
    {
        
        $twitter->setUp();
        $twitter->testStatusesUpdate(strval($message->getMessage()));
        $view = $this->view('post sent', Response::HTTP_OK, []);
             return $this->handleView($view);
    }
}
