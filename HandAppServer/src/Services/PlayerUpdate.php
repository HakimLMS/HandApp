<?php

namespace App\Services;

use App\Entity\Player; 

class PlayerUpdate {
    
    static function updatePlayer(Player $player, Player $playerToUpdate)
    {
        $playerToUpdate->setId($player->getId());
        $playerToUpdate->setName($player->getName());
        $playerToUpdate->setNumber($player->getNumber());
        $playerToUpdate->setPhoto($player->getPhoto());
        $playerToUpdate->setPoste($player->getPoste());
        $playerToUpdate->setMatchcount($player->getMatchcount());
        return $playerToUpdate;
    }
    
}
