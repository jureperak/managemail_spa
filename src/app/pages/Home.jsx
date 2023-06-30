function Home() {
  return (
    <div className="home-page">
      _______________________________________________________________
      <h1>Write a single page application for creating new e-mails.</h1>

      <ul>
        <li>Required fields:
        </li>
        <ol>
        <li>
          From email address
        </li>
        <li>
          To email address
        </li>
        <li>
          CC email addresses (use a separator to define multiple addresses)
        </li>
        <li>
          Subject
        </li>
        <li>
          Importance: Low, Normal, High
        </li>
        <li>
          Email content
        </li>
        </ol>
        <li>
          Have 2 buttons below the fields:
        </li>
        <ol>
        <li>
          Upon ‘Cancel’ ask the user for confirmation
        </li>
        <li>
          Upon ‘Send’ validate the input data and store them in MSSQL or any other DB. No actual e-mail sending
          necessary. If the data is invalid show the appropriate messages
        </li>
        </ol>   
        <li>
          BONUS: Have a separate ‘History’ tab that will browse through stored e-mails and show their content
        </li>
      </ul>    ________________________________________________________________________
    </div>
  );
}

export default Home;
