<?php
 
namespace App\Services; 
use App\Entity\Games;
class GameUpdate {
    static function updateGame(Games $game, Games $gameToUpdate){
       $gameToUpdate->setId($game->getId());
       $gameToUpdate->setDate($game->getdate());
       $gameToUpdate->setHomeTeam($game->getHomeTeam());
       $gameToUpdate->setAwayTeam($game->getAwayTeam());
       $gameToUpdate->setRoster($game->getRoster());
       
       return $gameToUpdate;
    } 
}
