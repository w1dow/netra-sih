const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'netra_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Initial Seed Data for fallback or MySQL seeding
const initialSeedData = {
  tenders: [
    {
      id: 'tend-001',
      tenderId: 'GEM/2026/B/8912401',
      title: 'Supply and Implementation of AI-Based Automated Document Verification System',
      description: 'Procurement of enterprise AI software solution for optical character recognition, document verification, and compliance validation for public procurement portals.',
      departmentId: 'dept-1',
      departmentName: 'Ministry of Electronics & IT',
      categoryId: 'cat-2',
      categoryName: 'IT & Electronics',
      location: 'New Delhi',
      estimatedValue: 45000000,
      currency: 'INR',
      deadline: '2026-09-30T17:00:00Z',
      status: 'ACTIVE',
      createdAt: '2026-08-15T10:00:00Z',
      updatedAt: '2026-08-15T10:00:00Z',
    },
    {
      id: 'tend-002',
      tenderId: 'GEM/2026/B/8912402',
      title: 'Construction of 4-Lane Elevated Corridor on NH-48 (KM 124 to 142)',
      description: 'Engineering, Procurement, and Construction (EPC) contract for construction of elevated 4-lane highway with modern tolling and monitoring infrastructure.',
      departmentId: 'dept-4',
      departmentName: 'Ministry of Road Transport & Highways',
      categoryId: 'cat-1',
      categoryName: 'Infrastructure',
      location: 'Gujarat',
      estimatedValue: 1850000000,
      currency: 'INR',
      deadline: '2026-10-15T15:00:00Z',
      status: 'ACTIVE',
      createdAt: '2026-08-18T11:30:00Z',
      updatedAt: '2026-08-18T11:30:00Z',
    },
    {
      id: 'tend-003',
      tenderId: 'GEM/2026/B/8912403',
      title: 'Procurement of High-End Diagnostic Imaging Equipment for AIIMS Facilities',
      description: 'Supply, installation, commissioning and 5-year comprehensive maintenance contract for advanced MRI and CT Scan systems across 4 regional AIIMS centers.',
      departmentId: 'dept-3',
      departmentName: 'Ministry of Health & Family Welfare',
      categoryId: 'cat-3',
      categoryName: 'Healthcare',
      location: 'Multiple States',
      estimatedValue: 620000000,
      currency: 'INR',
      deadline: '2026-09-25T14:00:00Z',
      status: 'ACTIVE',
      createdAt: '2026-08-20T09:15:00Z',
      updatedAt: '2026-08-20T09:15:00Z',
    },
    {
      id: 'tend-004',
      tenderId: 'GEM/2026/B/8912404',
      title: 'Setup of 500MW Solar Photovoltaic Power Plant in Solar Park Phase-IV',
      description: 'Selection of Solar Power Developer for setting up 500 MW Grid Connected Solar PV Power Project on Build-Own-Operate basis.',
      departmentId: 'dept-6',
      departmentName: 'Ministry of New & Renewable Energy',
      categoryId: 'cat-7',
      categoryName: 'Energy',
      location: 'Rajasthan',
      estimatedValue: 2400000000,
      currency: 'INR',
      deadline: '2026-11-01T18:00:00Z',
      status: 'UPCOMING',
      createdAt: '2026-08-22T14:00:00Z',
      updatedAt: '2026-08-22T14:00:00Z',
    },
    {
      id: 'tend-005',
      tenderId: 'GEM/2026/B/8912405',
      title: 'Supply of Specialized Communication Equipment & Radar Subsystems',
      description: 'Manufacture and supply of high-frequency tactical communications gear and radar telemetry modules adhering to defence standards.',
      departmentId: 'dept-2',
      departmentName: 'Ministry of Defence',
      categoryId: 'cat-4',
      categoryName: 'Defence & Security',
      location: 'Pune',
      estimatedValue: 980000000,
      currency: 'INR',
      deadline: '2026-09-10T12:00:00Z',
      status: 'UNDER_EVALUATION',
      createdAt: '2026-07-30T10:00:00Z',
      updatedAt: '2026-08-28T16:00:00Z',
    },
    {
      id: 'tend-006',
      tenderId: 'GEM/2026/B/8912406',
      title: 'Rolling Stock Maintenance & Signalling Upgrade for Metro Rail Sector',
      description: 'Comprehensive maintenance contract for train sets and integration of Automatic Train Control (ATC) signalling systems.',
      departmentId: 'dept-5',
      departmentName: 'Ministry of Railways',
      categoryId: 'cat-5',
      categoryName: 'Transportation',
      location: 'Bangalore',
      estimatedValue: 540000000,
      currency: 'INR',
      deadline: '2026-09-20T17:30:00Z',
      status: 'ACTIVE',
      createdAt: '2026-08-10T08:00:00Z',
      updatedAt: '2026-08-10T08:00:00Z',
    }
  ],
  bids: [
    {
      id: 'bid-101',
      tenderId: 'tend-001',
      bidderCompanyId: 'comp-01',
      bidValue: 42500000,
      status: 'SUBMITTED',
      complianceScore: 94.5,
      submittedAt: '2026-08-25T14:30:00Z',
      createdAt: '2026-08-20T10:00:00Z',
      updatedAt: '2026-08-25T14:30:00Z',
      isEditable: false,
      technicalNotes: 'Submitted complete technical proposal with ISO certifications, GST compliance reports, and MSE registration evidence.',
    },
    {
      id: 'bid-102',
      tenderId: 'tend-002',
      bidderCompanyId: 'comp-01',
      bidValue: 1790000000,
      status: 'UNDER_EVALUATION',
      complianceScore: 88.0,
      submittedAt: '2026-08-22T09:15:00Z',
      createdAt: '2026-08-19T11:00:00Z',
      updatedAt: '2026-08-28T16:00:00Z',
      isEditable: false,
      technicalNotes: 'Financial bid opened. Joint venture compliance documents verified by officer.',
    },
    {
      id: 'bid-103',
      tenderId: 'tend-003',
      bidderCompanyId: 'comp-01',
      bidValue: 610000000,
      status: 'DRAFT',
      complianceScore: 72.0,
      submittedAt: null,
      createdAt: '2026-08-28T15:00:00Z',
      updatedAt: '2026-08-28T15:00:00Z',
      isEditable: true,
      technicalNotes: 'Draft bid. Pending upload of OEM authorisation certificate.',
    }
  ],
  company: {
    id: 'comp-01',
    legalName: 'Apex Net Technologies Pvt Ltd',
    registrationNumber: 'U72900DL2018PTC334112',
    gstin: '07AAAAA0000A1Z5',
    pan: 'AAAAA0000A',
    udyamNumber: 'UDYAM-DL-03-0012345',
    category: 'Medium Enterprise (MSE)',
    address: 'Plot 42, Tech Park, Okhla Phase III, New Delhi - 110020',
    verificationStatus: {
      registration: true,
      gst: true,
      pan: true,
      udyam: true,
      authorisedRep: true,
      bankDetails: true,
    },
    biddingStats: {
      tendersParticipated: 24,
      activeBids: 3,
      completedBids: 21,
      complianceScore: 94.5,
      documentsVerified: 48,
      riskStatus: 'LOW',
    },
  },
  user: {
    id: 'user-01',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@apexnet.in',
    phone: '+91 98765 43210',
    designation: 'Director of Government Bidding',
    role: 'BIDDER',
    companyId: 'comp-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    location: 'New Delhi, India',
  },
  notifications: [
    {
      id: 'notif-1',
      userId: 'user-01',
      type: 'COMPLIANCE_ACTION_REQUIRED',
      title: 'OEM Authorisation Certificate Pending',
      message: 'Tender GEM/2026/B/8912403 requires updated OEM authorization certificate before submission.',
      tenderId: 'tend-003',
      bidId: 'bid-103',
      read: false,
      createdAt: '2026-08-28T16:00:00Z',
    },
    {
      id: 'notif-2',
      userId: 'user-01',
      type: 'BID_SUBMITTED',
      title: 'Bid Successfully Submitted',
      message: 'Your bid for GEM/2026/B/8912401 (AI Document Verification System) was submitted successfully.',
      tenderId: 'tend-001',
      bidId: 'bid-101',
      read: true,
      createdAt: '2026-08-25T14:30:00Z',
    },
    {
      id: 'notif-3',
      userId: 'user-01',
      type: 'COMPLIANCE_COMPLETED',
      title: 'AI Compliance Check 94.5%',
      message: 'Automated AI audit report completed for Bid #bid-101 with 0 critical non-compliance flags.',
      tenderId: 'tend-001',
      bidId: 'bid-101',
      read: true,
      createdAt: '2026-08-25T14:45:00Z',
    }
  ],
  news: [
    {
      id: 'news-1',
      title: 'GeM Portal Introduces AI-Driven Compliance & Verification Framework',
      summary: 'Government e-Marketplace launches automated AI document validation to streamline tender evaluation and reduce vendor processing time by up to 40%.',
      source: 'Ministry of Commerce & Industry',
      publishedAt: '2026-08-26T09:00:00Z',
      category: 'POLICY',
    },
    {
      id: 'news-2',
      title: 'Updated Public Procurement (Preference to Make in India) Order 2026',
      summary: 'Revised local content thresholds announced for IT software and telecom infrastructure procurement contracts above ₹5 Crores.',
      source: 'MeitY Gazette Notice',
      publishedAt: '2026-08-20T11:30:00Z',
      category: 'COMPLIANCE',
    },
    {
      id: 'news-3',
      title: 'Mandatory GST & PAN Live API Audit for All Class-I Local Suppliers',
      summary: 'All participating vendors on government procurement platforms must ensure real-time GST return sync and active Udyam registration status.',
      source: 'GeM Helpdesk',
      publishedAt: '2026-08-14T15:00:00Z',
      category: 'NOTICE',
    }
  ]
};

let pool = null;
let isUsingFallback = false;

// Memory storage for fallback state
const memoryStore = JSON.parse(JSON.stringify(initialSeedData));

async function initDB() {
  try {
    pool = mysql.createPool(DB_CONFIG);
    // Test connection
    const conn = await pool.getConnection();
    conn.release();
    console.log('MySQL Database Connected Successfully to host:', DB_CONFIG.host);
    await createTablesAndSeed();
  } catch (err) {
    console.warn('MySQL Connection failed (' + err.message + '). Operating in In-Memory DB Mode.');
    isUsingFallback = true;
  }
}

async function createTablesAndSeed() {
  if (!pool) return;
  try {
    // Create Tenders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tenders (
        id VARCHAR(50) PRIMARY KEY,
        tenderId VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        departmentId VARCHAR(50),
        departmentName VARCHAR(150),
        categoryId VARCHAR(50),
        categoryName VARCHAR(150),
        location VARCHAR(100),
        estimatedValue DECIMAL(15,2),
        currency VARCHAR(10) DEFAULT 'INR',
        deadline DATETIME,
        status VARCHAR(50),
        createdAt DATETIME,
        updatedAt DATETIME
      )
    `);

    // Create Bids table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bids (
        id VARCHAR(50) PRIMARY KEY,
        tenderId VARCHAR(50),
        bidderCompanyId VARCHAR(50),
        bidValue DECIMAL(15,2),
        status VARCHAR(50),
        complianceScore DECIMAL(5,2),
        submittedAt DATETIME,
        createdAt DATETIME,
        updatedAt DATETIME,
        isEditable BOOLEAN DEFAULT TRUE,
        technicalNotes TEXT
      )
    `);

    // Seed if empty
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM tenders');
    if (rows[0].count === 0) {
      for (const t of initialSeedData.tenders) {
        await pool.query(
          `INSERT INTO tenders (id, tenderId, title, description, departmentId, departmentName, categoryId, categoryName, location, estimatedValue, currency, deadline, status, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [t.id, t.tenderId, t.title, t.description, t.departmentId, t.departmentName, t.categoryId, t.categoryName, t.location, t.estimatedValue, t.currency, t.deadline ? new Date(t.deadline) : null, t.status, new Date(t.createdAt), new Date(t.updatedAt)]
        );
      }
      console.log('MySQL Database seeded with initial tenders.');
    }
  } catch (err) {
    console.error('Error creating database tables:', err.message);
  }
}

module.exports = {
  initDB,
  getPool: () => pool,
  isUsingFallback: () => isUsingFallback,
  memoryStore,
};
