<?php

namespace App\Services;

class TwitterService {
    
    const CONSUMER_KEY = "FMjPA0AgMiFvkrBsiQMjULBp6";
    
    const CONSUMER_SECRET = "CvtODZRc9cGVR6Q01nB4dkDPXOMCQ0JAc5nXzJkWqyB4vGJA0g";
 
    const OAUTH_ACCESS_TOKEN = "984540114402664449-3lyXapz6TxtdqC5e7ijwymiBXYApH2a";

    const OAUTH_ACCESS_TOKEN_SECRET = "tbjHxwzWldca7Wq5kCQEx0VS38xdRY9mwO66p8UgAeHBK";
    
    protected $exchange;
    
    public function setUp(){
        $settings = array();
        
        $reflector = new \ReflectionClass($this);
        
        foreach($reflector->getConstants() as $key => $value){
            $settings[strtolower($key)] = $value;
        }
        
        $this->exchange = new \TwitterAPIExchange($settings);
    }
    
    
    public function testStatusesUpdate($message)
    {
        $url    = 'https://api.twitter.com/1.1/statuses/update.json';
        $method = 'POST';
        $params = array(
            'status' => 'TEST TWEET TO BE DELETED' . rand(),
            'possibly_sensitive' => false
        );
        echo $this->exchange->buildOauth($url, 'POST')
                ->setPostfields(array('screen_name' => 'TacHandball', 'skip_status' => '1', 'status' => $message))
                ->performRequest(true, array(CURLOPT_SSL_VERIFYHOST => 0, CURLOPT_SSL_VERIFYPEER => 0));
        
    }
    
}
