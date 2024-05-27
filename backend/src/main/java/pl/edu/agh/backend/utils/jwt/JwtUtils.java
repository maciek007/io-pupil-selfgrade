package pl.edu.agh.backend.utils.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import pl.edu.agh.backend.exceptions.types.RequestWithoutAuthorizationException;

import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Component
public class JwtUtils {
    private final String SECRET_KEY = "secret";

    public String extractName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public boolean isExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String createToken(String name) {
        return Jwts.builder().setClaims(new HashMap<>())
                .setSubject(name)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(24)))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public String getToken(HttpHeaders headers) throws RequestWithoutAuthorizationException {
        if (headers == null) {
            throw new RequestWithoutAuthorizationException();
        }
        String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RequestWithoutAuthorizationException();
        }
        return authHeader.substring("Bearer ".length());
    }
}
