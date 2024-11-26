import { Container } from "inversify";
import '../controllers/actions.controller'
import '../controllers/welcome.controller'

const container = new Container( {autoBindInjectable: true});

export default container;