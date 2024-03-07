package Global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseMessage {

    SUCCESS("Request Successful"),
    FAIL("Request FAIL");

    private final String actualMessage;
}
