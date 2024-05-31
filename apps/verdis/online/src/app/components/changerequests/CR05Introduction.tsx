const CR05Introduction = () => {
  return (
    <>
      {' '}
      <p>
        Sollten Sie Änderungswünsche zu den angezeigten Flächen haben,
        aktivieren Sie hier bitte den Änderungsmodus. Im Änderungsmodus haben
        Sie die Möglichkeit, mit Ihrem Ansprechpartner in Kontakt zu treten,
        Flächen zu verändern oder anzulegen.
      </p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '20px' }}>
          <strong>Änderungsmodus: </strong>
          {/* <Toggle
                                onClick={() => {
                                    setCREditMode(!crEditMode);
                                }}
                                on={"Ein"}
                                off={"Aus"}
                                offstyle="danger"
                                onstyle="success"
                                active={crEditMode}
                                style={{ padding: 10 }}
                            /> */}
        </div>
      </div>
    </>
  );
};

export default CR05Introduction;
