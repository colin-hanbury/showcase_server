import { Container } from "inversify";
import '../features/actions/controllers/actions.controller'
import '../features/welcome/controllers/welcome.controller'

const container = new Container( {autoBindInjectable: true});

export default container;