package com.openclassrooms.starterjwt.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.auditing.DateTimeProvider;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAccessor;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserDtoTest {

    @InjectMocks
    private UserDto userDto;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserDto identicalUserDto;
    private UserDto differentUserDto;

    @BeforeEach
    void setUp() {
        createdAt = LocalDateTime.now().minusDays(1);
        updatedAt = LocalDateTime.now();
        userDto = new UserDto(1L, "test@gmail.com", "lastName",
                "firstName", false, "pass@word", createdAt,
                updatedAt);

        identicalUserDto = new UserDto(1L, "test@gmail.com", "lastName",
                "firstName", false, "pass@word", userDto.getCreatedAt(),
                userDto.getUpdatedAt());

        differentUserDto = new UserDto(2L, "diff@gmail.com", "diffLastName",
                "diffFirstName", true, "diffPass", LocalDateTime.now(),
                LocalDateTime.now().plusDays(2));
    }

    @Test
    void getId() {
        assertEquals(1L, userDto.getId());
    }

    @Test
    void getEmail() {
        assertEquals("test@gmail.com", userDto.getEmail());
    }

    @Test
    void getLastName() {
        assertEquals("lastName", userDto.getLastName());
    }

    @Test
    void getFirstName() {
        assertEquals("firstName", userDto.getFirstName());
    }

    @Test
    void isAdmin() {
        assertFalse(userDto.isAdmin());
    }

    @Test
    void getPassword() {
        assertEquals("pass@word", userDto.getPassword());
    }

    @Test
    void getCreatedAt() {
        assertEquals(createdAt, userDto.getCreatedAt());
    }

    @Test
    void getUpdatedAt() {
        assertEquals(updatedAt, userDto.getUpdatedAt());
    }

    @Test
    void setId() {
        userDto.setId(2L);
        assertEquals(2L, userDto.getId());
    }

    @Test
    void setEmail() {
        userDto.setEmail("newemail@test.com");
        assertEquals("newemail@test.com", userDto.getEmail());
    }

    @Test
    void setLastName() {
        userDto.setLastName("newLastName");
        assertEquals("newLastName", userDto.getLastName());
    }

    @Test
    void setFirstName() {
        userDto.setFirstName("newFirstName");
        assertEquals("newFirstName", userDto.getFirstName());
    }

    @Test
    void setAdmin() {
        userDto.setAdmin(true);
        assertTrue(userDto.isAdmin());
    }

    @Test
    void setPassword() {
        userDto.setPassword("newPassword");
        assertEquals("newPassword", userDto.getPassword());
    }

    @Test
    void setCreatedAt() {
        LocalDateTime newCreatedAt = LocalDateTime.now().minusDays(1);
        userDto.setCreatedAt(newCreatedAt);
        assertEquals(newCreatedAt, userDto.getCreatedAt());
    }

    @Test
    void setUpdatedAt() {
        LocalDateTime newUpdatedAt = LocalDateTime.now().plusDays(2);
        userDto.setUpdatedAt(newUpdatedAt);
        assertEquals(newUpdatedAt, userDto.getUpdatedAt());
    }

    @Test
    void testEquals() {
        UserDto anotherUserDto = new UserDto(1L, "test@gmail.com", "lastName",
                "firstName", false, "pass@word", createdAt, updatedAt);
        assertEquals(userDto, anotherUserDto);
    }

    @Test
    void canEqual() {
        UserDto anotherUserDto = new UserDto();
        assertTrue(userDto.canEqual(anotherUserDto));
    }

    @Test
    void testHashCode() {
        UserDto anotherUserDto = new UserDto(1L, "test@gmail.com", "lastName",
                "firstName", false, "pass@word", createdAt, updatedAt);
        assertEquals(userDto.hashCode(), anotherUserDto.hashCode());
    }

    @Test
    void testToString() {
        String expectedString = "UserDto(id=1, email=test@gmail.com, lastName=lastName, " +
                "firstName=firstName, admin=false, password=pass@word, createdAt=" + createdAt +
                ", updatedAt=" + updatedAt + ")";
        assertEquals(expectedString, userDto.toString());
    }




    @Test
    void testEquals_sameObject() {
        assertEquals(userDto, userDto); // Vérifie que l'objet est égal à lui-même
    }

    @Test
    void testEquals_identicalObject() {
        assertEquals(userDto, identicalUserDto); // Vérifie que deux objets identiques sont égaux
    }

    @Test
    void testEquals_differentObject() {
        assertNotEquals(userDto, differentUserDto); // Vérifie que deux objets différents ne sont pas égaux
    }

    @Test
    void testEquals_nullObject() {
        assertNotEquals(userDto, null); // Vérifie qu'un objet comparé à `null` retourne `false`
    }

    @Test
    void testEquals_differentClass() {
        assertNotEquals(userDto, new Object()); // Vérifie qu'un objet de type différent retourne `false`
    }

    @Test
    void testHashCode_sameObject() {
        assertEquals(userDto.hashCode(), identicalUserDto.hashCode()); // Vérifie que deux objets identiques ont le même hashCode
    }

    @Test
    void testHashCode_differentObject() {
        assertNotEquals(userDto.hashCode(), differentUserDto.hashCode()); // Vérifie que deux objets différents ont des hashCodes différents
    }
    private class GlobalDateTimeProvider implements DateTimeProvider {
        private LocalDateTime dateAt;

        @Override
        public Optional<TemporalAccessor> getNow() {
            return Optional.of(LocalDateTime.now());
        }
    }
}
