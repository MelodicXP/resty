import './Results.scss';

let Results = (props) => {
  const {header, count, results} = props.data || {};
  const { loading } = props;

  return(
    <>

    {loading ? (
        <section>Loading...</section>
      ) : (
        <>
          <section>
            <pre data-testid="results-header">{header ? JSON.stringify({ header }, undefined, 2) : null}</pre>
          </section>
          <section>
            <pre data-testid="results">{results ? JSON.stringify({ count, results }, undefined, 2) : null}</pre>
          </section>
        </>
      )}
    
    
    </>
  );
};

export default Results;