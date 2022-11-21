import React from 'react';

import Form from 'components/Form';
import MainPageImage from 'components/SvgElements/MainPageImage';

function MainPage() {
  return (
    <main>
      <section className="notes-creation">
        <div className="notes-creation__form">
          <h1>Create a note</h1>
          <Form />
        </div>
        <div className="notes-creation__image">
          <MainPageImage />
        </div>
      </section>
    </main>
  );
}

export default MainPage;
