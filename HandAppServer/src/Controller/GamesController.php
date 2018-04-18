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
use App\Entity\Games;
use App\Exceptions\RessourcesValidationException;
use App\Helper\EntityManagerService;
use App\Services\GameUpdate;


class GamesController extends FOSRestController
{
    /**
     * @Rest\Get(
     * path= "/api/games",
     * name="games_list"
     * )
     * @Rest\View()
     */
    public function gamesList(EntityManagerService $emService)
    {
        $gamesRepo = $emService->getGamesEntityRepo();
        $games = $gamesRepo->findAll();
        $view = $this->view($games, Response::HTTP_OK, []);
        return $this->handleView($view);
    }
    
     /**
     * @Rest\Post(
     * path= "/api/games/add",
     * name="add_game"
     * )
     * @ParamConverter("game", converter="fos_rest.request_body", options={"validator" ={ "groups"="Create"}})
     * @Rest\View()
     */
    public function addGame(Games $game, ConstraintViolationList $violations, EntityManagerService $emService)
    {
            if (count($violations)) {
            $message = 'The JSON sent contains invalid data :';
            foreach ($violations as $violation)
            {
                $message .= sprintf( "Field %s: % s", $violation->getPropertyPath(), $violation->getMessage());
            }
            
            throw new RessourcesValidationException($message);

        }
       $emService->flushEntity($game);
       $view = $this->view($game, Response::HTTP_CREATED, []);
       return $this->handleView($view);
    }
    
    /**
     * @Rest\Get(
     * path="/api/games/{id}",
     * name="gameDetails",
     * requirements={"id"="\d+"}
     * )
     * @param Games $game
     * @Rest\View()
     */
    public function showGameDetails(Games $game)
    {
        $view = $this->view($game, Response::HTTP_OK, []);
        return $this->handleView($view);
    }
    
    /**
     * @Rest\Delete(
     * path="/api/games/delete/{id}",
     * name="deleteGame",
     * requirements={"id"="\d+"}
     * )
     * @param Games $game
     * @Rest\View()
     */
    public function deleteGame($id, EntityManagerService $emService)
    {
        $gameToDelete = $emService->getGamesEntityRepo()->find($id);
        $emService->removeEntity($gameToDelete);
        $view = $this->view('', Response::HTTP_OK, ['Location' => $this->generateUrl('playersList', [ UrlGeneratorInterface::ABSOLUTE_URL])]);
        return $this->handleView($view);
    }
    
    /**
    * @Rest\Put(
    * path="/api/games/edit/{id}",
    * name="gmeEdit",
    * requirements={"id"="\d+"}
    * )
    * @ParamConverter("game", converter="fos_rest.request_body")
    * @Rest\View()
    */
    public function editGame(Games $game, ConstraintViolationList $violations, EntityManagerService $emHelper)
    {
        if (count($violations)) {
            $message = 'The JSON sent contains invalid data :';
        foreach ($violations as $violation){
            $message .= sprintf( "Field %s: % s", $violation->getPropertyPath(), $violation->getMessage());
            }
        throw new RessourcesValidationException($message);
        }
        
        $gameToUpdate = $emHelper->getGamesEntityRepo()->find($game->getId());
        $emHelper->flushEntity(GameUpdate::updateGame($game, $gameToUpdate));
        $view = $this->view($game, Response::HTTP_OK, []);
        return $this->handleView($view);
    }
            
}
