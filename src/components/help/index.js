import styles from '../../style/HelpPage.module.css';
import { Link, Outlet } from "react-router-dom";

function Help() {
    return (
        <div className={styles.container}>
            <h2>Help</h2>
            <div>
                <p>Welcome to the Help Page for Cashtagram! Whether you're just starting or seeking advanced features,
                    this resource hub is your go-to for navigating our platform. From setting up your account to mastering
                    budgeting techniques, we're here to simplify the process and provide valuable insights into your
                    financial health. Find detailed guides, step-by-step tutorials, and tips for adding expenses, setting
                    up budgets, generating reports, and more. Our dedicated support team is here to assist you every step
                    of the way. Thank you for choosing Cashtagram as your trusted partner in financial management—we're
                    excited to help you achieve your goals!</p>
            </div>
            <nav>
                <ul className={styles.nav}>
                    <li><Link to='/help/home'>Home Page</Link></li>
                    <li><Link to='/help/add'>Add Page</Link></li>
                    <li><Link to='/help/expenses'>Expenses Page</Link></li>
                </ul>
            </nav>
            <br />
            <Outlet />
        </div>
    )
}

export default Help;
