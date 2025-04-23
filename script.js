const companies = [
    {
        name: 'Microsoft',
        symbol: 'MSFT',
        color: '#00a4ef'
    },
    {
        name: 'Apple',
        symbol: 'AAPL',
        color: '#666666'
    },
    {
        name: 'Google',
        symbol: 'GOOGL',
        color: '#4285f4'
    },
    {
        name: 'Amazon',
        symbol: 'AMZN',
        color: '#ff9900'
    },
    {
        name: 'Meta',
        symbol: 'META',
        color: '#1877f2'
    }
];

// Mock data for demonstration
function generateMockData() {
    const data = {};
    companies.forEach(company => {
        data[company.symbol] = {
            stockPrice: Math.random() * 300 + 100,
            marketCap: Math.random() * 1000 + 500,
            revenue: Math.random() * 100 + 50,
            employees: Math.floor(Math.random() * 100000 + 50000)
        };
    });
    return data;
}

function createCompanyCards(data) {
    const container = document.getElementById('company-cards');
    container.innerHTML = '';

    companies.forEach(company => {
        const companyData = data[company.symbol];
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <h2>${company.name}</h2>
            <p>Stock Price: $${companyData.stockPrice.toFixed(2)}</p>
            <p>Market Cap: $${companyData.marketCap.toFixed(2)}B</p>
            <p>Revenue: $${companyData.revenue.toFixed(2)}B</p>
            <p>Employees: ${companyData.employees.toLocaleString()}</p>
        `;
        container.appendChild(card);
    });
}

function createStockChart(data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: companies.map(c => c.name),
            datasets: [{
                label: 'Stock Price ($)',
                data: companies.map(c => data[c.symbol].stockPrice),
                backgroundColor: companies.map(c => c.color),
                borderColor: companies.map(c => c.color),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Stock Prices Comparison'
                }
            }
        }
    });
}

function createMetricsChart(data) {
    const ctx = document.getElementById('metricsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: companies.map(c => c.name),
            datasets: [{
                label: 'Market Cap ($B)',
                data: companies.map(c => data[c.symbol].marketCap),
                backgroundColor: companies.map(c => c.color)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Market Capitalization'
                }
            }
        }
    });
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

async function initDashboard() {
    try {
        showLoading();
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = generateMockData();
        
        createCompanyCards(data);
        createStockChart(data);
        createMetricsChart(data);
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        alert('Failed to load dashboard data. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Initialize the dashboard when the page loads
window.addEventListener('load', initDashboard);