<?php

namespace App\Helper;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Player;
use App\Entity\Games;

class EntityManagerService {
    /**
    * @var \Doctrine\ORM\EntityManager
    */
    private $em;
    public $repo;
    
    public function __construct(EntityManagerInterface $em){
        $this->em  = $em;
    }
    
    public function flushEntity($entity) {
       
       if (is_array($entity))
       {
           foreach($entity as $ent)
           {
               $this->em->persist($ent);
           }
       }
       else
       {
           $this->em->persist($entity);   
       }
       $this->em->flush();       
   }
   
   public function removeEntity($entity) {
       if (is_array($entity))
       {
           foreach($entity as $ent)
           {
               $this->em->remove($ent);
           }
       }
       else
       {
           $this->em->remove($entity);   
       }
       $this->em->flush();   
   }
   
   public function getPlayerEntityRepo()
   {
       $this->repo = $this->em->getRepository(Player::Class);
       return $this->repo;
   }
   
   public function getGamesEntityRepo()
   {
       $this->repo = $this->em->getRepository(Games::Class);
       return $this->repo; 
   }
}
