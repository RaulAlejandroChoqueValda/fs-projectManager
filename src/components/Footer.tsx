type FooterProps = {
    total: number;
    completed: number;
    pending: number;
};

function Footer(props: FooterProps) {
    return (
        <footer className="footer">
            <p>Total de tareas: {props.total}</p>
            <p>Tareas completadas: {props.completed}</p>
            <p>Tareas pendientes: {props.pending}</p>
        </footer>
    );
}

export default Footer;