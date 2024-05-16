import React, { useState } from 'react';
import styles from './register.module.css';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props { }

interface User {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const Register: React.FC<Props> = () => {
  const [user, setUser] = useState<User>({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<User>>({});

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<User> = {};

    if (!user.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!validateEmail(user.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!user.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    }

    if (!user.password.trim()) {
      newErrors.password = 'Please enter a password';
    } else if (user.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(user.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(user.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(user.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(user.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted');
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.leftColumn}>
        <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1715763126~exp=1715766726~hmac=93dc0ac054d0bfaa151f7fcc6c72a1ce0b76a5c250f1a5cdd0be5f83315ae429&w=740" alt="Logo"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
          }} />
      </div>
      <div className={styles.rightColumn}>
        <Container
          maxWidth="sm"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Box
            boxShadow={3}
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius={3}
          >
            <Typography variant="h3" color="primary" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                name="email"
                value={user.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Phone"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                name="phone"
                value={user.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                name="password"
                value={user.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="medium"
                  style={{ width: '30%' }}
                >
                  Register
                </Button>
              </Box>
            </form>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
              Already registered? <Link to="/">Log in here</Link>
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Register;
