import './History.scss';

let History = (props) => {
  const { history } = props;

  return (
    <section>
      <pre data-testid="history">
        <ul>
          {history.map((item, index) => (
            <div key ={index}>
              {JSON.stringify(item, null, 2)};
            </div>
          ))}
        </ul>
      </pre>
    </section>
  );
};

export default History;