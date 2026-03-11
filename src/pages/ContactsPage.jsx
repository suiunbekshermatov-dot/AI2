function ContactsPage() {
  return (
    <section className="page-card">
      <h2>Contacts</h2>
      <div className="contact-grid">
        <article className="section-card">
          <h3>Administration Office</h3>
          <p>Email: admin@college.edu</p>
          <p>Phone: +1 (555) 010-100</p>
        </article>
        <article className="section-card">
          <h3>Academic Department</h3>
          <p>Email: academics@college.edu</p>
          <p>Phone: +1 (555) 010-200</p>
        </article>
        <article className="section-card">
          <h3>IT Support</h3>
          <p>Email: support@college.edu</p>
          <p>Phone: +1 (555) 010-300</p>
        </article>
      </div>
    </section>
  );
}

export default ContactsPage;
