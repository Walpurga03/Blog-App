import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        />
        <span className="slider">
          <div className="icons">
            <svg className="sun-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15ZM11,1h2v3H11Zm0,19h2v3H11ZM3.515,4.929l1.414-1.414L7.05,5.636,5.636,7.05ZM16.95,18.364l1.414-1.414,2.121,2.121-1.414,1.414ZM4.929,20.485l-1.414-1.414,2.121-2.121,1.414,1.414ZM18.364,7.05,16.95,5.636l2.121-2.121,1.414,1.414ZM23,11v2H20V11ZM4,11v2H1V11Z"/>
            </svg>
            <svg className="moon-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9z"/>
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle;
