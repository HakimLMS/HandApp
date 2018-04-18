<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\AccessType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;



/**
 * @ORM\Entity(repositoryClass="App\Repository\PlayerRepository")
 * @AccessType("public_method")
 * 
 */
class Player
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"Create"})
    */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"list", "details"})     
     * @Assert\NotBlank(groups={"Create"})
     */
    private $name;
    


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"list", "details"})     
     * @Assert\NotBlank(groups={"Create"})
     */
    private $surname;


    /**
     * @ORM\Column(type="integer")
     * @Groups({"list", "details"})
     * @Assert\NotBlank(groups={"Create"})
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"details"})
     * @Assert\NotBlank(groups={"Create"})
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true )
     * @Groups({"list", "details"})
     * @Assert\NotBlank(groups={"Create"})
     */
    private $poste;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"list", "details"})
     * @Assert\NotBlank(groups={"Create"})
     */
    private $matchcount;
    
    public function __construct()
    {
        $this->matchcount = 0;
    }

    function getId() {
        return $this->id;
    }

    function getName() {
        return $this->name;
    }

    function getNumber() {
        return $this->number;
    }

    function getPhoto() {
        return $this->photo;
    }

    function getPoste() {
        return $this->poste;
    }

    function getMatchcount() {
        return $this->matchcount;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setNumber($number) {
        $this->number = $number;
    }

    function setPhoto($photo) {
        $this->photo = $photo;
    }

    function setPoste($poste) {
        $this->poste = $poste;
    }

    function setMatchcount($matchcount) {
        $this->matchcount = $matchcount;
    }

    function getSurname() {
    return $this->surname;
    }

    function setSurname($surname) {
        $this->surname = $surname;
    }

}
