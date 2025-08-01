import { Link } from "react-router-dom";

function LandingPage() {
  const styles = {
    header: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ddd'
    },
    logo: {
      fontSize: '24px', fontWeight: 'bold', color: '#333'
    },
    nav: {
      display: 'flex', gap: '20px'
    },
    ul: {
      listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0
    },
    link: {
      textDecoration: 'none', color: '#333'
    },
    authButtons: {
      display: 'flex', gap: '10px'
    },
    btn: {
      padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '16px', borderRadius: '4px'
    },
    btnPrimary: {
      backgroundColor: '#007bff', color: '#fff'
    },
    btnSecondary: {
      backgroundColor: '#6c757d', color: '#fff'
    },
    hero: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 20px', backgroundColor: '#f0f0f0'
    },
    heroContent: {
      maxWidth: '50%'
    },
    heroImage: {
      width: '40%', height: '250px', backgroundColor: '#ddd', display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    section: {
      padding: '40px 20px', textAlign: 'center'
    },
    cards: {
      display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '20px'
    },
    card: {
      border: '1px solid #ccc', borderRadius: '6px', padding: '20px', width: '280px', textAlign: 'left'
    },
    contactForm: {
      maxWidth: '500px', margin: '0 auto', textAlign: 'left'
    },
    formGroup: {
      marginBottom: '15px'
    },
    footer: {
      padding: '40px 20px', backgroundColor: '#333', color: '#fff'
    },
    footerContent: {
      display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px'
    },
    footerColumn: {
      marginBottom: '20px'
    },
    footerBottom: {
      textAlign: 'center'
    }
  };

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>Hostel Sathi</div>
        <nav>
          <ul style={styles.ul}>
            <li><a href="#features" style={styles.link}>Features</a></li>
            <li><a href="#pricing" style={styles.link}>Pricing</a></li>
            <li><a href="#about" style={styles.link}>About</a></li>
            <li><a href="#contact" style={styles.link}>Contact</a></li>
          </ul>
        </nav>
        <div style={styles.authButtons}>
          <Link to="/login" style={{ ...styles.btn, ...styles.btnSecondary }}>Login</Link>
          <Link to="/signup" style={{ ...styles.btn, ...styles.btnPrimary }}>Sign Up</Link>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1>Find Your Perfect Hostel & PG Accommodation</h1>
          <p>Simplifying hostel and PG management for owners and students alike</p>
          <Link to="/signup" style={{ ...styles.btn, ...styles.btnPrimary }}>Get Started</Link>
        </div>
       <div style={styles.heroImage}>
  <img
    src="https://media.istockphoto.com/id/1077951632/photo/backpacker-using-her-phone-in-a-hostel-at-varanasi-india.jpg?s=1024x1024&w=is&k=20&c=8aouxE_Bg5EOGPeoRgUR2TRg4av7i3EIEr0eZ8bQ-1g="
    alt="Backpacker using phone in a hostel"
    style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
  />
</div>

      </section>

      <section id="features" style={styles.section}>
        <h2>Our Features</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>🏠 Easy Listing</h3>
            <p>List your hostel or PG with detailed information in minutes</p>
          </div>
          <div style={styles.card}>
            <h3>📱 Booking Management</h3>
            <p>Manage bookings, check-ins, and check-outs with ease</p>
          </div>
          <div style={styles.card}>
            <h3>💰 Fee Collection</h3>
            <p>Track payments, generate receipts, and send reminders</p>
          </div>
        </div>
      </section>

      <section id="pricing" style={styles.section}>
        <h2>Pricing Plans</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Basic</h3>
            <p>₹999/month</p>
            <ul>
              <li>Up to 50 rooms</li>
              <li>Basic booking management</li>
              <li>Email support</li>
            </ul>
          </div>
          <div style={{ ...styles.card, borderColor: '#007bff' }}>
            <h3>Pro</h3>
            <p>₹1,999/month</p>
            <ul>
              <li>Up to 200 rooms</li>
              <li>Advanced booking management</li>
              <li>Fee collection & reminders</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div style={styles.card}>
            <h3>Enterprise</h3>
            <p>₹4,999/month</p>
            <ul>
              <li>Unlimited rooms</li>
              <li>Complete management suite</li>
              <li>Advanced analytics</li>
              <li>Dedicated account manager</li>
              <li>API access</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" style={styles.section}>
        <h2>Get In Touch</h2>
        <form style={styles.contactForm}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Name</label><br />
            <input type="text" id="name" placeholder="Your name" />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email</label><br />
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="message">Message</label><br />
            <textarea id="message" placeholder="Your message"></textarea>
          </div>
          <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>Send Message</button>
        </form>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.logo}>Hostel Sathi</div>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={styles.footerColumn}>
              <h4>Product</h4>
              <ul>
                <li><a href="#features" style={styles.link}>Features</a></li>
                <li><a href="#pricing" style={styles.link}>Pricing</a></li>
                <li><a href="#" style={styles.link}>Documentation</a></li>
              </ul>
            </div>
            <div style={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li><a href="#about" style={styles.link}>About</a></li>
                <li><a href="#contact" style={styles.link}>Contact</a></li>
                <li><a href="#" style={styles.link}>Careers</a></li>
              </ul>
            </div>
            <div style={styles.footerColumn}>
              <h4>Legal</h4>
              <ul>
                <li><a href="#" style={styles.link}>Privacy</a></li>
                <li><a href="#" style={styles.link}>Terms</a></li>
                <li><a href="#" style={styles.link}>Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Hostel Sathi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;