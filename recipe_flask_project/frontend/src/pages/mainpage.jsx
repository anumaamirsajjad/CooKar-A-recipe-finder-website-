import React from 'react';

const MainPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#fdf6e3', // Cream light brown
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      {/* Cookar Title */}
      <h1
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#4B2E2E', // Coffee brown
          textAlign: 'center',
          marginBottom: '40px',
          letterSpacing: '1px',
        }}
      >
        Cookar
      </h1>

      {/* White Box Container */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {/* Search Bar + Button */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            placeholder="Search recipes by name or ingredient..."
            style={{
              flex: '1 1 300px',
              padding: '14px 18px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
            }}
          />
          <button
            style={{
              padding: '14px 24px',
              backgroundColor: '#4B2E2E',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>

        {/* Dropdowns Side-by-Side */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* Dietary Preference */}
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4B2E2E' }}>
              Dietary Preference
            </label>
            <select
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                backgroundColor: '#fff',
              }}
            >
              <option>All Preferences</option>
              <option>Vegetarian</option>
              <option>Beef</option>
              <option>Mutton</option>
              <option>Chicken</option>
            </select>
          </div>

          {/* Cuisine */}
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4B2E2E' }}>
              Cuisine
            </label>
            <select
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                backgroundColor: '#fff',
              }}
            >
              <option>All Cuisines</option>
              <option>Pashto</option>
              <option>Balochi</option>
              <option>Sindhi</option>
              <option>Punjabi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;