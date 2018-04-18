<?php

namespace App\Normalizer;

abstract class AbstractNormalizer implements NormalierInterface
{
    protected $exceptionsType;
    
    public function __construct(array $exceptionsTypes)
    {
        $this->exceptionsType = $exceptionsTypes;
    }
    
    public function supports(\Exception $exception)
    {
        return in_array($exception, $this->exceptionsTypes);
    }
}
