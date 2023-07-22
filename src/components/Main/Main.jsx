import Promo from '../Promo/Promo.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import Techs from '../Techs/Techs.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';

function Main({ testLogOut }) {
  return (
    <>
    <Promo testLogOut={testLogOut}/>
    <AboutProject />
    <Techs />
    <AboutMe />
    </>
  );
}

export default Main;
