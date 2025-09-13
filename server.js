const http = require('http');
const { parse } = require('url');

let internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'Tech Solutions India Pvt Ltd',
    duration: '6 months',
    stipend: '₹15,000/month',
    skills: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    company: 'Data Corp',
    duration: '3 months',
    stipend: '₹10,000/month',
    skills: ['Python', 'SQL']
  }
];

let allocations = [
  { studentId: 1, internshipId: 1 }
];

let nextId = 3;

function send(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req, cb) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      cb(JSON.parse(body || '{}'));
    } catch {
      cb({});
    }
  });
}

const server = http.createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);

  if (req.method === 'OPTIONS') {
    send(res, 200, {});
    return;
  }

  if (pathname === '/api/internships' && req.method === 'GET') {
    if (query.studentId) {
      const sid = Number(query.studentId);
      const ids = allocations.filter(a => a.studentId === sid).map(a => a.internshipId);
      return send(res, 200, internships.filter(i => ids.includes(i.id)));
    }
    return send(res, 200, internships);
  }

  if (pathname === '/api/internships' && req.method === 'POST') {
    return parseBody(req, body => {
      const internship = { id: nextId++, ...body };
      internships.push(internship);
      send(res, 201, internship);
    });
  }

  if (pathname.startsWith('/api/internships/') ) {
    const id = Number(pathname.split('/')[3]);
    const index = internships.findIndex(i => i.id === id);
    if (index === -1) {
      send(res, 404, { error: 'Internship not found' });
      return;
    }

    if (req.method === 'GET') {
      return send(res, 200, internships[index]);
    }

    if (req.method === 'PUT') {
      return parseBody(req, body => {
        internships[index] = { ...internships[index], ...body, id };
        send(res, 200, internships[index]);
      });
    }

    if (req.method === 'DELETE') {
      const removed = internships.splice(index, 1)[0];
      allocations = allocations.filter(a => a.internshipId !== id);
      return send(res, 200, removed);
    }
  }

  if (pathname === '/api/allocations' && req.method === 'GET') {
    return send(res, 200, allocations);
  }

  if (pathname === '/api/allocations' && req.method === 'POST') {
    return parseBody(req, body => {
      const { studentId, internshipId } = body;
      const exists = internships.some(i => i.id === internshipId);
      if (!exists) return send(res, 404, { error: 'Internship not found' });
      allocations = allocations.filter(a => !(a.studentId === studentId && a.internshipId === internshipId));
      const alloc = { studentId, internshipId };
      allocations.push(alloc);
      send(res, 201, alloc);
    });
  }

  send(res, 404, { error: 'Not found' });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`API server running on port ${PORT}`));
