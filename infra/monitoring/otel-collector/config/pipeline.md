
### ----- ↓↓↓ FROM FLUENT BIT

```json
{
    "time": "2025-12-24T01:12:31.463843471Z",
    "log": "The actual log line",
    "stream": "stdout",
    "fluent_tag": "docker.var.lib.docker.containers.<container_id>.<container_id>-json.log"
}
```
### ----- ↓↓↓ OTEL COLLECTOR fluentforward RECEIVER OUTPUTS:

```json
{
    "ResourceLogs": [
        {
            "Resource": {<EMPTY>},
            "ScopeLogs": {<CONTENT THE SAME AS THE FINAL OUTPUT>}
        }
    ]
}
```

### ----- ↓↓↓ OTEL COLLECTOR resource PROCESSOR OUTPUTS:

```json
{
    "ResourceLogs": [
        {
            "Resource": {<CONTENT THE SAME AS THE FINAL OUTPUT>},
            "ScopeLogs": {<CONTENT THE SAME AS THE FINAL OUTPUT>}
        }
    ]
}
```

### ----- ↓↓↓ OTEL COLLECTOR otlphttp/logs EXPORTER OUTPUTS:


```json

{
    "ResourceLogs": [
        {
        "Resource": {
            "attributes": [
            {
                "key": "service.name",
                "value": {
                    "stringValue": "my-app"
                }
            },
            {
                "key": "service.namespace",
                "value": {
                    "stringValue": "production"
                }
            }
            ]     
        },
        "ScopeLogs": [
            {
            "scope": {},
            "logRecords": [
                {
                "timeUnixNano": "1766538751525599228",
                "body": {
                    "stringValue": "level=info ts=2025-12-24T01:12:31.463843471Z caller=table_manager.go:136 index-store=tsdb-2020-05-15 msg=\"uploading tables\"\n"
                },
                attributes: [
                    {
                        "key": "stream",
                        "value": {
                            "stringValue": "stderr"
                        }
                    },
                    {
                        "key": "time",
                        "value": {
                            "stringValue": "2025-12-24T01:12:31.525599228Z"
                        }
                    },
                    {
                        "key": "fluent.tag",
                        "value": {
                            "stringValue": "docker.var.lib.docker.containers.ca09b49c6606f3a89186710b4ccf8dfd9aa564c28a969b2b762d0588d9c6d9e1.ca09b49c6606f3a89186710b4ccf8dfd9aa564c28a969b2b762d0588d9c6d9e1-json.log"
                        }
                    }
                ]
                }
            ]
            }
        ]         
        }
    ]      
}

```


