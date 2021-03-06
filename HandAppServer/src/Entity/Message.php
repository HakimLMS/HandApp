<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    
     /**
     * @ORM\Column(type="string")
     */
    private $message;
    
    public function getMessage() {
        return $this->message;
    }

    function setMessage($message) {
        $this->message = $message;
    }

    
    public function getId()
    {
        return $this->id;
    }
}
