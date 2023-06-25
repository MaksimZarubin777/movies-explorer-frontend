import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='section__title'>Технологии</h2>
      <div className='techs__container'>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='techs__list'>
          <p className='techs__list_element'>HTML</p>
          <p className='techs__list_element'>CSS</p>
          <p className='techs__list_element'>JS</p>
          <p className='techs__list_element'>React</p>
          <p className='techs__list_element'>Git</p>
          <p className='techs__list_element'>Express.js</p>
          <p className='techs__list_element'>mongoDB</p>
        </div>
      </div>
    </section>
  );
}

export default Techs;
