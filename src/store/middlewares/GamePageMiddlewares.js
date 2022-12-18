import * as GamePageActionsCreators from "../actionCreators/GamePageActionCreators"
import { getGameById } from "../../modules";


const fetchGameInfo = (id_game) => async dispatch => {
    if (id_game) {
        dispatch(GamePageActionsCreators.createAction_setLoadingStatus(true))
        const game = await getGameById(id_game)
        dispatch(GamePageActionsCreators.createAction_setGame(game))
        dispatch(GamePageActionsCreators.createAction_setLoadingStatus(false))
    }
}

export default fetchGameInfo