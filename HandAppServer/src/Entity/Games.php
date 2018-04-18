<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\AccessType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as JMS;
/**
 * @ORM\Entity(repositoryClass="App\Repository\GamesRepository")
 * @AccessType("public_method")
 */
class Games
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\DateTime()
     * @JMS\Type("DateTime<'d-m-Y'>")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $homeTeam;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $awayTeam;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private $roster;
    
    /**
     * @ORM\Column(type="boolean")
     */
    private $passed;
    
    
    function setId($id) {
        $this->id = $id;
    }
    
    function getId()
    {
        return $this->id;
    }

    function getPassed() {
        return $this->passed;
    }

    function setPassed($passed) {
        $this->passed = $passed;
    }
    
    function getDate(): \DateTimeInterface
    {
        return $this->date;
    }

    function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    function getHomeTeam() {
        return $this->homeTeam;
    }

    function getAwayTeam() {
        return $this->awayTeam;
    }

    function setHomeTeam($homeTeam) {
        $this->homeTeam = $homeTeam;
    }

    function setAwayTeam($awayTeam) {
        $this->awayTeam = $awayTeam;
    }

    
    function getRoster()
    {
        return $this->roster;
    }

    function setRoster($roster): self
    {
        $this->roster = $roster;

        return $this;
    }
}
