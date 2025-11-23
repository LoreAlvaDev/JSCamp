export const DevJobsAvatar = ({ service = "github", username = "midudev", size = "40" }) => {
    const createUrl = (service, username, size) => {
        return service && username && size ? `https://unavatar.io/${service}/${username}?size=${size}` : "./foto.png";
        // return "./foto.png";
    };
    return (
        <>
            <a href="#">
                <img src={createUrl(service, username, size)} alt={`avatar de ${username} de ${service}`} />
            </a>
        </>
    );
};
