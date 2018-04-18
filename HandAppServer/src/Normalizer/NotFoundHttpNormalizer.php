<?php
namespace App\Normalizer;

use App\Normalizer\AbstractNormalizer;



class NotFoundHttpNormalizer extends AbstractNormalizer {
    
    public function normalize(\Exception $exception)
    {
        $result['code'] = Response::HTTP_NOT_FOUND;
        
        $result['body'] = [
            'code' => 404,
            'message' => $exception->getMessage()
        ];
        
        return $result;
    }
} 