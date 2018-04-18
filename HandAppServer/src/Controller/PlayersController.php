<?php

namespace App\Controller;



use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\ConstraintViolationList;
use App\Entity\Player;
use App\Exceptions\RessourcesValidationException;
use App\Helper\EntityManagerService;
use App\Services\PlayerUpdate;


/**
 * 
 */
class PlayersController extends FOSRestController
{
    /**
     * @Rest\Get(
     * path="/api/players",
     * name="playersList",
     * )
     * @Rest\View()
     */
    public function playerList()
    {
        $playerRepo = $this->getDoctrine()->getManager()->getRepository(Player::Class);
        $players = $playerRepo->findAll();
             $view = $this->view($players, Response::HTTP_OK, []);
             return $this->handleView($view);
    }
    
     /**
     * @Rest\Post(
     * path="/api/players/create",
     * name="createPlayer",
     *  options={"method_prefix" = false}
     * )
     * @ParamConverter("player", converter="fos_rest.request_body",options={"validator" ={ "groups"="Create"}})
     * @Rest\View()
     */
    public function createPlayer(Player $player, ConstraintViolationList $violations,  EntityManagerService $emHelper)
    {
        if (count($violations)) {
            $message = 'The JSON sent contains invalid data :';
            foreach ($violations as $violation)
            {
                $message .= sprintf( "Field %s: % s", $violation->getPropertyPath(), $violation->getMessage());
            }
            
            throw new RessourcesValidationException($message);

        }
       $emHelper->flushEntity($player);
       $view = $this->view($player, 201);
       return $this->handleView($view);
    }
    
    /**
     * @Rest\Get(
     * path="/api/players/{id}",
     * name="playerDetails",
     * requirements={"id"="\d+"}
     * )
     * @Rest\View()
     */
    public function showPlayerDetails(Player $player)
    {
     $view = $this->view($player, Response::HTTP_OK, []);
     return $this->handleView($view);
    }
    
    /**
     * @Rest\Put(
     * path="/api/players/edit/{id}",
     * name="playerEdit",
     * requirements={"id"="\d+"}
     * )
     * @ParamConverter("player", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function editPlayer(Player $player, ConstraintViolationList $violations, EntityManagerService $emHelper)
    {       
        $playerToUpdate = $emHelper->getPlayerEntityRepo()->find($player->getId());         
        $emHelper->flushEntity(PlayerUpdate::updatePlayer($player, $playerToUpdate));
        $view = $this->view($player, Response::HTTP_OK, ['Location' => $this->generateUrl('playerDetails', ['id' => $player->getId(), UrlGeneratorInterface::ABSOLUTE_URL])]);
        return $this->handleView($view);
    }
    
    /**
     * @Rest\Delete(
     * path="/api/players/delete/{id}",
     * name="playerDelete",
     * requirements={"id"="\d+"}
     * )
     * @Rest\View()
     */
    public function deletePlayer($id, EntityManagerService $emHelper)
    {
        
        $playerToDelete = $emHelper->getPlayerEntityRepo()->find($id);
        $emHelper->removeEntity($playerToDelete);
        $view = $this->view('', Response::HTTP_OK, ['Location' => $this->generateUrl('playersList', [ UrlGeneratorInterface::ABSOLUTE_URL])]);
        return $this->handleView($view);
    }

}
