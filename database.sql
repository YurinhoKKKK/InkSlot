-- Banco de Dados: InkSlot

-- Tabela: Usuários

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    fone VARCHAR(20),
    senha VARCHAR(255),
);
-- Tabela: Tatuadores
CREATE TABLE IF NOT EXISTS tattoo_artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    bio TEXT,
    profile_image VARCHAR(255)
);

-- Tabela: Agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    artist_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('Pendente', 'Confirmado', 'Concluído', 'Cancelado') DEFAULT 'Pendente',
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (artist_id) REFERENCES tattoo_artists(id)
);