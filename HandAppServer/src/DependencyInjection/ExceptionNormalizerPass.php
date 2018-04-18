<?php
 
namespace App\DependencyInjection;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class ExceptionNormalizerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $cbuild)
    {
        $exceptionListenerDefinition = $cbuild->findDefinition('app.exception_subscriber');
        $normalizers = $cbuild->findTaggedServiceIds('app.normalizer');
        
        foreach ($normalizers as $id => $tags)
        {
            $exceptionListenerDefinition->addMethodCall('addNormalizer', [new Reference($id)]);
        }
    }
}
